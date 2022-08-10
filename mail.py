import smtplib, ssl

def send(email, tosend, password, message):
    with smtplib.SMTP_SSL('smtp.gmail.com, 465') as connection:
        email_address = email
        email_password = password
        connection.login(email_address, email_password)
        connection.sendmail(from_addr=email_address, to_addrs=tosend, msg=message)