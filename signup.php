<?php
session_start();
require_once "db.php";

$error = "";

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $name = trim($_POST["name"] ?? "");
    $email = trim($_POST["email"] ?? "");
    $password = $_POST["password"] ?? "";
    $confirmPassword = $_POST["confirm_password"] ?? "";

    if ($name === "" || $email === "" || $password === "" || $confirmPassword === "") {
        $error = "Please fill in all fields.";
    } elseif (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $error = "Please enter a valid email address.";
    } elseif (strlen($password) < 6) {
        $error = "Password must be at least 6 characters long.";
    } elseif ($password !== $confirmPassword) {
        $error = "Passwords do not match.";
    } else {
        try {
            $checkStmt = $conn->prepare("SELECT id FROM users WHERE email = ? LIMIT 1");
            $checkStmt->bind_param("s", $email);
            $checkStmt->execute();
            $checkStmt->store_result();
            $emailExists = $checkStmt->num_rows > 0;
            $checkStmt->close();

            if ($emailExists) {
                $error = "This email is already registered.";
            } else {
                $passwordHash = password_hash($password, PASSWORD_DEFAULT);
                $insertStmt = $conn->prepare("INSERT INTO users (name, email, password) VALUES (?, ?, ?)");
                $insertStmt->bind_param("sss", $name, $email, $passwordHash);
                $insertStmt->execute();
                $insertStmt->close();

                header("Location: login.php?registered=1");
                exit;
            }
        } catch (mysqli_sql_exception $e) {
            error_log($e->getMessage());
            $error = "Signup failed. Please try again.";
        }
    }
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Sign Up</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <main class="container">
        <section class="form-box">
            <h1>Create account</h1>
            <p>Enter your details to sign up.</p>

            <?php if ($error !== ""): ?>
                <p class="message"><?php echo htmlspecialchars($error, ENT_QUOTES, "UTF-8"); ?></p>
            <?php endif; ?>

            <form method="post" action="signup.php">
                <label for="name">Name</label>
                <input type="text" id="name" name="name" required>

                <label for="email">Email</label>
                <input type="email" id="email" name="email" required>

                <label for="password">Password</label>
                <input type="password" id="password" name="password" minlength="6" required>

                <label for="confirm_password">Confirm password</label>
                <input type="password" id="confirm_password" name="confirm_password" minlength="6" required>

                <button type="submit">Sign up</button>
            </form>

            <p class="form-link">Already have an account? <a href="login.php">Login</a></p>
        </section>
    </main>
</body>
</html>
