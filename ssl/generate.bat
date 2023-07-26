@echo off

SET NAME=nuxt.local
SET TYPE=DNS
SET PASSWORD=password
SET OPENSSL=openssl
SET DAYS=36500
SET FOLDER=output


@REM ###


IF EXIST %WINDIR%\system32\config\systemprofile\* (
    cd %~dp0
) ELSE (
    echo [ERROR] Run as administrator !
    pause
    exit
)

mkdir %FOLDER%
cd %FOLDER%

%OPENSSL% genrsa -aes256 -out CA.key -passout pass:%PASSWORD% 2048
%OPENSSL% req -subj "/C=CZ/ST= /O= /CN= " -new -key CA.key -out CA.csr -passin pass:%PASSWORD%
%OPENSSL% x509 -req -in CA.csr -signkey CA.key -days %DAYS% -out CA.crt -passin pass:%PASSWORD%

echo basicConstraints=CA:FALSE>option.v3
echo subjectKeyIdentifier=hash>>option.v3
echo authorityKeyIdentifier=keyid,issuer>>option.v3
echo keyUsage=nonRepudiation, digitalSignature, keyEncipherment>>option.v3
echo subjectAltName=%TYPE%:%NAME%>>option.v3

%OPENSSL% genrsa -aes256 -out local.key -passout pass:%PASSWORD% 2048
%OPENSSL% req -subj "/C=CZ/ST= /O= /CN= " -new -key local.key -out local.csr -passin pass:%PASSWORD%
%OPENSSL% x509 -req -in local.csr -CA CA.crt -CAkey CA.key -days %DAYS% -out local.crt -passin pass:%PASSWORD% -extfile option.v3 -CAcreateserial
%OPENSSL% rsa -in local.key -out local.key -passin pass:%PASSWORD%

DEL CA.key CA.csr CA.srl option.v3 local.csr

certutil -addstore -f -enterprise -user root "CA.crt"

SET NEWLINE=^& echo.
FIND /C /I "%NAME%" %WINDIR%\system32\drivers\etc\hosts
IF %ERRORLEVEL% NEQ 0 ECHO %NEWLINE%^127.0.0.1 %NAME%>>%WINDIR%\System32\drivers\etc\hosts
