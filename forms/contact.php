<?php

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require '../PHPMailer/src/Exception.php';
require '../PHPMailer/src/PHPMailer.php';
require '../PHPMailer/src/SMTP.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {

    $name = htmlspecialchars($_POST['name']);
    $email = htmlspecialchars($_POST['email']);
    $subject = htmlspecialchars($_POST['subject']);
    $message = nl2br(htmlspecialchars($_POST['message']));

    $mail = new PHPMailer(true);

    try {
        $mail->isSMTP();
        $mail->Host       = 'smtp.hostinger.com';
        $mail->SMTPAuth   = true;
        $mail->Username   = 'contato@redearaujojunqueira.com.br';
        $mail->Password   = 'IAJ@10Digital';
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;
        $mail->Port       = 465;

        $mail->setFrom('contato@redearaujojunqueira.com.br', $name);
        $mail->addReplyTo($email, $name);
        $mail->addAddress('contato@redearaujojunqueira.com.br');

        // Conteúdo HTML do email
        $mail->isHTML(true);
        $mail->Subject = "{$subject}";
        $mail->Body    = "
        <h2>Novo contato via website</h2>
        <table border='1' cellpadding='10' style='border-collapse: collapse;'>
            <tr>
                <th style='text-align:left;'>Nome:</th>
                <td>{$name}</td>
            </tr>
            <tr>
                <th style='text-align:left;'>E-mail:</th>
                <td>{$email}</td>
            </tr>
            <tr>
                <th style='text-align:left;'>Assunto:</th>
                <td>{$subject}</td>
            </tr>
            <tr>
                <th style='text-align:left;'>Mensagem:</th>
                <td>{$message}</td>
            </tr>
        </table>
        ";

        $mail->AltBody = strip_tags("Nome: {$name}\nE-mail: {$email}\nAssunto: {$subject}\nMensagem: {$_POST['message']}");

        $mail->send();
        echo 'OK';
    } catch (Exception $e) {
        echo "Erro ao enviar: {$mail->ErrorInfo}";
    }

} else {
    echo "Método inválido.";
}

