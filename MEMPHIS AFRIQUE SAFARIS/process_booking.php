<?php
// Database connection
$host = "localhost";
$user = "root";
$password = "";
$database = "travel_booking";

$conn = new mysqli($host, $user, $password, $database);

if ($conn->connect_error) {
    die(json_encode(["message" => "Database connection failed: " . $conn->connect_error]));
}

// Get form data
$name = $_POST['name'];
$email = $_POST['email'];
$phone = $_POST['phone'];
$destination = $_POST['destination'];
$date = $_POST['date'];
$requests = $_POST['requests'];

// Insert booking into database
$sql = "INSERT INTO bookings (name, email, phone, destination, travel_date, requests) 
        VALUES (?, ?, ?, ?, ?, ?)";
$stmt = $conn->prepare($sql);
$stmt->bind_param("ssssss", $name, $email, $phone, $destination, $date, $requests);

if ($stmt->execute()) {
    // Send email confirmation
    sendEmail($name, $email, $destination, $date, $requests);
    sendEmailToOwner($name, $email, $phone, $destination, $date, $requests);

    echo json_encode(["message" => "✅ Booking Successful! A confirmation email has been sent."]);
} else {
    echo json_encode(["message" => "❌ Booking failed. Please try again."]);
}

$stmt->close();
$conn->close();

// Function to send email using SendGrid API
function sendEmail($name, $email, $destination, $date, $requests) {
    $sendgrid_api_key = "YOUR_SENDGRID_API_KEY";

    $email_data = [
        "personalizations" => [[
            "to" => [["email" => $email]],
            "subject" => "Booking Confirmation"
        ]],
        "from" => ["email" => "noreply@yourwebsite.com"],
        "content" => [[
            "type" => "text/html",
            "value" => "<h2>Booking Confirmed</h2><p>Dear $name,</p>
                        <p>Thank you for booking a trip to <b>$destination</b> on <b>$date</b>.</p>
                        <p>Special Requests: $requests</p>
                        <p>We look forward to serving you!</p>"
        ]]
    ];

    sendSendGridEmail($email_data, $sendgrid_api_key);
}

// Function to send email to the website owner
function sendEmailToOwner($name, $email, $phone, $destination, $date, $requests) {
    $owner_email = "owner@example.com"; // Change to the website owner's email
    $sendgrid_api_key = "YOUR_SENDGRID_API_KEY";

    $email_data = [
        "personalizations" => [[
            "to" => [["email" => $owner_email]],
            "subject" => "New Booking Received"
        ]],
        "from" => ["email" => "noreply@yourwebsite.com"],
        "content" => [[
            "type" => "text/html",
            "value" => "<h2>New Booking Received</h2>
                        <p><b>Name:</b> $name</p>
                        <p><b>Email:</b> $email</p>
                        <p><b>Phone:</b> $phone</p>
                        <p><b>Destination:</b> $destination</p>
                        <p><b>Travel Date:</b> $date</p>
                        <p><b>Requests:</b> $requests</p>"
        ]]
    ];

    sendSendGridEmail($email_data, $sendgrid_api_key);
}

// Function to send email via SendGrid API
function sendSendGridEmail($email_data, $sendgrid_api_key) {
    $url = 'https://api.sendgrid.com/v3/mail/send';

    $ch = curl_init($url);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_HTTPHEADER, [
        'Authorization: Bearer ' . $sendgrid_api_key,
        'Content-Type: application/json'
    ]);
    curl_setopt($ch, CURLOPT_POST, true);
    curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($email_data));

    $response = curl_exec($ch);
    curl_close($ch);
}
?>
