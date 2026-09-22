<?php
declare(strict_types=1);

header('Content-Type: application/json; charset=utf-8');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['ok' => false, 'error' => 'method_not_allowed']);
    exit;
}

// --- config -----------------------------------------------------------
$SPREADSHEET_ID   = '16m8b1kjHsFXkuSbdy7cTOwM3AS9zVWo0DOGJaPIMuHY';
$SHEET_NAME       = 'Sheet1';
$CREDENTIALS_PATH = __DIR__ . '/../../secrets/usacars-503216-1c1e00868fca.json';
// ------------------------------------------------------------------------

function bad(string $error, int $code = 400): void {
    http_response_code($code);
    echo json_encode(['ok' => false, 'error' => $error]);
    exit;
}

$raw = file_get_contents('php://input');
$body = json_decode($raw ?: '', true);
if (!is_array($body)) {
    bad('invalid_json');
}

$firstName = trim((string)($body['firstName'] ?? ''));
$lastName  = trim((string)($body['lastName'] ?? ''));
$email     = trim((string)($body['email'] ?? ''));
$phone     = trim((string)($body['phone'] ?? ''));
$userAgent = trim((string)($body['userAgent'] ?? ($_SERVER['HTTP_USER_AGENT'] ?? '')));
$gtag      = trim((string)($body['gtag'] ?? ''));

if ($firstName === '' || $email === '' || $phone === '') {
    bad('missing_fields');
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    bad('invalid_email');
}

// US phone: 10 digits, or 11 digits starting with a leading 1.
$digits = preg_replace('/\D/', '', $phone);
if (!preg_match('/^1?\d{10}$/', $digits)) {
    bad('invalid_phone');
}

if (!is_file($CREDENTIALS_PATH)) {
    bad('server_misconfigured', 500);
}

$credentials = json_decode((string)file_get_contents($CREDENTIALS_PATH), true);
if (!is_array($credentials) || empty($credentials['private_key']) || empty($credentials['client_email'])) {
    bad('server_misconfigured', 500);
}

function base64url(string $data): string {
    return rtrim(strtr(base64_encode($data), '+/', '-_'), '=');
}

function getGoogleAccessToken(array $credentials): ?string {
    $header = ['alg' => 'RS256', 'typ' => 'JWT'];
    $now = time();
    $claim = [
        'iss'   => $credentials['client_email'],
        'scope' => 'https://www.googleapis.com/auth/spreadsheets',
        'aud'   => $credentials['token_uri'] ?? 'https://oauth2.googleapis.com/token',
        'iat'   => $now,
        'exp'   => $now + 3600,
    ];

    $signingInput = base64url((string)json_encode($header)) . '.' . base64url((string)json_encode($claim));

    $signature = '';
    $ok = openssl_sign($signingInput, $signature, $credentials['private_key'], 'sha256WithRSAEncryption');
    if (!$ok) {
        return null;
    }

    $jwt = $signingInput . '.' . base64url($signature);

    $ch = curl_init($credentials['token_uri'] ?? 'https://oauth2.googleapis.com/token');
    curl_setopt_array($ch, [
        CURLOPT_POST           => true,
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_TIMEOUT        => 15,
        CURLOPT_POSTFIELDS     => http_build_query([
            'grant_type' => 'urn:ietf:params:oauth:grant-type:jwt-bearer',
            'assertion'  => $jwt,
        ]),
    ]);
    $response = curl_exec($ch);
    $status = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    curl_close($ch);

    if ($response === false || $status !== 200) {
        return null;
    }

    $data = json_decode($response, true);
    return $data['access_token'] ?? null;
}

$accessToken = getGoogleAccessToken($credentials);
if (!$accessToken) {
    bad('google_auth_failed', 502);
}

$timestamp = date('n/j/Y, g:i:s A');

$row = [$timestamp, $firstName, $lastName, $email, $phone, $userAgent, $gtag];

$range = rawurlencode($SHEET_NAME) . '!A:G';
$url = "https://sheets.googleapis.com/v4/spreadsheets/{$SPREADSHEET_ID}/values/{$range}:append?valueInputOption=USER_ENTERED&insertDataOption=INSERT_ROWS";

$ch = curl_init($url);
curl_setopt_array($ch, [
    CURLOPT_POST           => true,
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_TIMEOUT        => 15,
    CURLOPT_HTTPHEADER     => [
        'Authorization: Bearer ' . $accessToken,
        'Content-Type: application/json',
    ],
    CURLOPT_POSTFIELDS => json_encode(['values' => [$row]]),
]);
$response = curl_exec($ch);
$status = curl_getinfo($ch, CURLINFO_HTTP_CODE);
curl_close($ch);

if ($response === false || $status < 200 || $status >= 300) {
    bad('sheet_append_failed', 502);
}

echo json_encode(['ok' => true]);
