<?php
if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $to = "support@norcalcashforcars.com";
    $subject = "New Contact Form Submission - NorCal Cash for Cars";

    // Sanitize and capture fields
    $fields = ['name', 'email', 'phone', 'paperwork', 'keys', 'zipcode', 'vehicle_type', 'notes', 'source'];
    foreach ($fields as $f) {
        $$f = htmlspecialchars($_POST[$f] ?? 'Not specified');
    }

    // Build message
    $message = "New contact form submission:\n" .
               "---------------------------------\n" .
               "Name: $name\n" .
               "Email: $email\n" .
               "Phone: $phone\n" .
               "Paperwork: $paperwork\n" .
               "Keys: $keys\n" .
               "Zipcode: $zipcode\n" .
               "Vehicle Type: $vehicle_type\n" .
               "Notes: $notes\n" .
               "Source: $source\n";

    $headers = "From: NorCal Cash for Cars <noreply@norcalcashforcars.com>\r\n";
    $headers .= "Reply-To: $email\r\n";
    $headers .= "Content-Type: text/plain; charset=UTF-8\r\n";

    if (mail($to, $subject, $message, $headers)) {
        echo "success";
    } else {
        http_response_code(500);
        echo "error";
    }
} else {
    http_response_code(405);
    echo "invalid";
}
?>
