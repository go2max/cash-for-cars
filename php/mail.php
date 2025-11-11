<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $to = "support@norcalcashforcars.com"; // your email
    $subject = "New Contact Form Submission - NorCal Cash for Cars";

    $name = htmlspecialchars($_POST['name']);
    $email = htmlspecialchars($_POST['email']);
    $phone = htmlspecialchars($_POST['phone']);
    $paperwork = htmlspecialchars($_POST['paperwork'] ?? 'Not specified');
    $keys = htmlspecialchars($_POST['keys'] ?? 'Not specified');
    $zipcode = htmlspecialchars($_POST['zipcode']);
    $vehicle_type = htmlspecialchars($_POST['vehicle_type']);
    $notes = htmlspecialchars($_POST['notes']);
    $source = htmlspecialchars($_POST['source'] ?? 'website');

    $message = "
    New contact form submission:
    ----------------------------
    Name: $name
    Email: $email
    Phone: $phone
    Paperwork: $paperwork
    Keys: $keys
    Zipcode: $zipcode
    Vehicle Type: $vehicle_type
    Notes: $notes
    Source: $source
    ";

    $headers = "From: noreply@norcalcashforcars.com\r\n";
    $headers .= "Reply-To: $email\r\n";

    if (mail($to, $subject, $message, $headers)) {
        echo "success";
    } else {
        echo "error";
    }
} else {
    echo "invalid";
}
?>
