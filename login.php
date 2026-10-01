<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <title>Coffee Shop - Login</title>

    <!-- CSS file -->
    <link rel="stylesheet" href="login.css">
</head>

<body>

    <div class="login-container" >

        <div class="login-box">

            <h1>Coffee Bliss</h1>

            <p class="welcome">Welcome back, coffee lover ☕</p>

            <form action="" method="post">

                <label for="name">Name</label>
                <input
                    type="text"
                    id="name"
                    name="name"
                    placeholder="Enter your name"
                    required
                >

                <label for="email">Email</label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Enter your email"
                    required
                >

                <label for="password">Password</label>
                <input
                    type="password"
                    id="password"
                    name="pass"
                    placeholder="Enter your password"
                    required
                >

                <div class="remember">
                    <label>
                        <input type="checkbox" name="remember">
                        Remember me
                    </label>

                    <a href="#">Forgot Password?</a>
                </div>

                <input
                    type="submit"
                    name="submit"
                    value="Login"
                    class="login-btn"
                >

            </form>

            <p class="signup">
                Don't have an account?
                <a href="sign up.html">Sign Up</a>
            </p>

        </div>

    </div>

</body>
</html>
