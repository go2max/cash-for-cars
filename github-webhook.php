<?php
$secret = 'your_secret_here'; // same as webhook secret
$payload = file_get_contents('php://input');
$signature = 'sha1=' . hash_hmac('sha1', $payload, $secret);

if (!hash_equals($signature, $_SERVER['HTTP_X_HUB_SIGNATURE'])) {
    http_response_code(403);
    exit('Invalid signature.');
}

// Run pull script
$output = shell_exec('/home/username/update.sh 2>&1');
echo "Updated: " . $output;
?>
