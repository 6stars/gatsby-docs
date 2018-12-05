---
title: "Connecting to RabbitMQ in AWS test environments"
category: "rabbitmq"
date: "11-05-2018"
slug: "/internal/rabbitmq/aws-test-connect"
tags:
    - AWS
    - test-env
---

## Installs and Git Clones

<a name="installs-and-git-clones--git"></a><a name="1.1"></a>

- [1.1](#installs-and-git-clones--git) **Pull Down Code and Directory Setup**:

  > From Project Root where you cloned Definitive Repos. Run the following command in Powershell (Admin)

  ```powershell
  ./build.cmd updateApis
  ```

<a name="installs-and-git-clones--install"></a><a name="1.2"></a>

- [1.2](#installs-and-git-clones--install) **Install .NET CORE**:

  - [Windows 64-bit SDK Installer for .NET Core SDK 1.0.4](https://github.com/dotnet/core/blob/master/release-notes/download-archives/1.0.4-sdk-download.md)
  - [Windows 64-bit SDK Installer for .NET Core SDK 1.1.4](https://github.com/dotnet/core/blob/master/release-notes/download-archives/1.1.4-download.md)
  - [.NET Core Tooling for Visual Studio 2015](https://github.com/dotnet/core/blob/master/release-notes/download-archives/1.0.1-preview2-download.md) (link at the very bottom)

    - **Note #1:** Installation is required even if not using Visual Studio 2015. This installer will add an ASP.NET Core library to the IIS system folder. That file is `C:\Windows\Syswow64\Inetsrv\aspnetcore.dll`, and it is required by our application. Not having this file will result in HTTP 503 (Service Unavailable) errors.

    - **Note #2:** Certain updates to Windows 10, like the Creators Update, will corrupt the installation of the .NET Core Tools Preview 2 for Visual Studio 2015. This will result in the `C:\Windows\Syswow64\Inetsrv\aspnetcore.dll` being deleted. When updating Windows 10, verify this file is present in your system. If it is not, repair the installation of the "Microsoft .NET Core 1.0.1 - VS 2015 Tooling Preview 2" from Add/Remove Programs in Control Panel.

    - **Note #3:** If you are getting HTTP 503 (Service Unavailable) errors and you have changed your password, you need to update your Application Pools Identity with the new password. [Here's how you do that](#iis--applicationhost).

<a name="installs-and-git-clones--install"></a><a name="1.3"></a>

- [1.3](#installs-and-git-clones--install) **Install NodeJS**:

  > Install from [Node](https://nodejs.org/en/download/)

<a name="clone--install"></a><a name="1.4"></a>

- [1.4](#clone--install) **Install Yarn**:

  > Install from [Yarn](https://yarnpkg.com/lang/en/docs/install/)

<a name="iis--urlrewrite"></a><a name="1.5"></a>

- [1.5](#clone--urlrewrite) **Install IIS Url Rewrite Module**:

  > Install from [Url Rewrite Module Download](https://www.iis.net/downloads/microsoft/url-rewrite)

**[⬆ back to top](#table-of-contents)**

## IIS Setup

<a name="iis--windowsfeatures"></a><a name="2.1"></a>

- [2.1](#iis--windowsfeatures) **Turn Windows Features On And Off**:

  > In Powershell (Admin)

  ```powershell
  ./build.cmd iisFeatures
  ```

**[⬆ back to top](#table-of-contents)**

<a name="iis--host"></a><a name="2.2"></a>

- [2.2](#iis--host) **Edit Host File**:

  > Open in Text Editor of Choice as Administrator: `C:\Windows\System32\drivers\etc\hosts`.

  ```text
  # Copyright (c) 1993-2009 Microsoft Corp.
  #
  # This is a sample HOSTS file used by Microsoft TCP/IP for Windows.
  #
  # This file contains the mappings of IP addresses to host names. Each
  # entry should be kept on an individual line. The IP address should
  # be placed in the first column followed by the corresponding host name.
  # The IP address and the host name should be separated by at least one
  # space.
  #
  # Additionally, comments (such as these) may be inserted on individual
  # lines or following the machine name denoted by a '#' symbol.
  #
  # For example:
  #
  #      102.54.94.97     rhino.acme.com          # source server
  #       38.25.63.10     x.acme.com              # x client host

  # localhost name resolution is handled within DNS itself.
  127.0.0.1       localhost dev.defisolutions.com dbsplit.defisolutions.com
  ```

**[⬆ back to top](#table-of-contents)**

<a name="iis--applicationhost"></a><a name="2.3"></a>

- [2.3](#iis--applicationhost) **.\build.cmd setupIIS**:

  > run `.\build.cmd setupIIS` and follow the prompts
  
**[⬆ back to top](#table-of-contents)**

## Auth - Apis

<a name="apis--nugetsrc"></a><a name="3.1"></a>

- [3.1](#apis--nugetsrc) **Add Nuget Source**:

  - Open Visual Studio 2015
  - Add Nuget Package Source
    - ASPNETMASTER - `https://www.myget.org/F/aspnetmaster/api/v2/`
    - Defi v3 - `https://www.myget.org/F/defisolutions/auth/f44ec685-f692-4976-a1f4-41531a1d3596/api/v3/index.json`
    - Defi v2 - `https://www.myget.org/F/defisolutions/auth/f44ec685-f692-4976-a1f4-41531a1d3596/api/v2`

<a name="apis--authapi"></a><a name="3.2"></a>

- [3.2](#apis--authapi) [**Defi Auth Api**](https://github.com/DefiSolutions/Defi-AuthApi):

  (Same as [1.1](#installs-and-git-clones--git), can skip if you already ran it). From Project Root where you cloned Definitive Repos. Run the following command in Powershell (Admin):

  ```powershell
  ./build.cmd updateApis
  ```

  OR

  - Open Powershell As Administrator
  - `cd {ProjectRoot}\api\Defi-AuthApi`
  - `.\build.cmd`

<a name="apis--authpresapi"></a><a name="3.3"></a>

- [3.3](#apis--authpresapi) [**Defi Auth Presentation Api**](https://github.com/DefiSolutions/Defi-AuthPresentationApi):

  > **Error Logs for Auth Presentation API are in `c:\Logs`. Any errors coming from Auth Api will be in the same log files.**

  (Same as [1.1](#installs-and-git-clones--git), can skip if you already ran it). From Project Root where you cloned Definitive Repos. Run the following command in Powershell (Admin):

  ```powershell
  ./build.cmd updateApis
  ```

  OR

  - Open Powershell As Administrator
  - `cd {ProjectRoot}\api\Defi-AuthPresentationApi`
  - `.\build.cmd`

## Defi-Ui - React Apps

> **All React Apps are in the [Defi-Ui](https://github.com/DefiSolutions/Defi-Ui) repo**

- Make sure `Defi-Ui` directory has correct Security Permissions needed for IIS
  - With Windows Explorer. Right Click on `Defi-Ui` directory and Click Properties
  - Select Security Tab
  - Need to make sure your Windows Login Account has full permissions
  - Need to make sure the `Users` group has read permissions

### Currently the following are working apps used in Defi Admin

> **All apps have functioning built versions already in each apps `dev` directory which have already been mapped in IIS when we first setup IIS.**
>
> **No need to build anything for them to work locally.**

- [login](https://github.com/DefiSolutions/Defi-Ui/tree/develop/login)
  > [http://dev.defisolutions.com/ui/login](http://dev.defisolutions.com/ui/login)

- [application](https://github.com/DefiSolutions/Defi-Ui/tree/develop/application)
  > Application Page Routing: `/ui/application/{uw or f}/{loanApplicationId}`
  >
  > [http://dev.defisolutions.com/ui/application/uw/18](http://dev.defisolutions.com/ui/application/uw/18)
  >
  > [http://dev.defisolutions.com/ui/application/f/26](http://dev.defisolutions.com/ui/application/f/26)

- [queues](https://github.com/DefiSolutions/Defi-Ui/tree/develop/queues)
  - Turn on both New Queues and New UI in 1 script
  ```sql
  UPDATE [Compass].[dbo].[CompassConfigSettings]
  SET ConfigValue = 'True'
  WHERE ConfigKey IN ('UserInterface.UseNewQueues','UserInterface.UseNewPhase2')
  and ClientId = 1
  ```
  > Queues Page Routing `/ui/queues/{uw or f}/{queueId}`
  >
  > Underwriter Main Queue - [http://dev.defisolutions.com/ui/queues/uw/2](http://dev.defisolutions.com/ui/queues/uw/2)
  >
  > Funder Main Queue - [http://dev.defisolutions.com/ui/queues/f/8](http://dev.defisolutions.com/ui/queues/f/8)

- [qap](https://github.com/DefiSolutions/Defi-Ui/tree/develop/qap)
  > [http://dev.defisolutions.com/ui/configuration/sync](http://dev.defisolutions.com/ui/configuration/sync)

- [config audit](https://github.com/DefiSolutions/Defi-Ui/tree/develop/configaudit)

### If you need to debug page

- `cd queues`
- `yarn start`
- browse to `dev.defisolutions.com/ui/queues/uw/2` or access queues page from dashboard

## Test - Verify Defi Admin Web

### Build Definitive (if you haven't already)

- Open Powershell As Administrator
- `cd {DefinitiveProjectRoot}` (usually C:\Projects\Definitive)
- `.\build.cmd`

### Open Chrome Browser

- clear all cookies and cache for `http://dev.defisolutions.com`
- browse to `http://dev.defisolutions.com`
- should be forced to `http://dev.defisolutions.com/ui/login` which is new login page
- login
- should land on `http://dev.defisolutions.com/Home/Landing`
- Turn on NewUI by going to `http://dev.defisolutions.com/ProdSupport/ConfigSettings` and update `UserInterface.UseNewPhase2` to `true` for `Beta Client` or Run Sql Query:
  ```sql
  UPDATE [Compass].[dbo].[CompassConfigSettings]
  SET ConfigValue = 'True'
  WHERE ConfigKey = 'UserInterface.UseNewPhase2'
  and ClientId = 1
  ```
- logoff
- login
- access app in queue
- should see app page with New UI

**[⬆ back to top](#table-of-contents)**

## Auth - Owin

- Code in [Definitive/Startup.cs](Definitive/Startup.cs) and  [Definitive/Auth](Definitive/Auth)
- We use Owin Cookie Middleware to Authorize the JWT `AuthToken` and `RefreshToken` cookies created in `Auth Presentation Api` when user logged in

**[⬆ back to top](#table-of-contents)**

## Auth - Session Timeout

- Can be configured with the following Client ConfigSettings
  - `Auth.SessionTimeout.IsActive` if `False` Session Timeout is defaulted at `24 hours`
  - `Auth.SessionTimeout.LengthInMinutes`
- When on a page a `6 min` remaining in session a Modal Displays with a `5 min` countdown. Leave 1 min for Logout Cleanup

**[⬆ back to top](#table-of-contents)**

## Auth - Password Security

- Password Expiration Can be configured with the following Client ConfigSettings
  - `Auth.PasswordExpiration.IsActive`
  - `Auth.PasswordExpiration.IntervalInDays`
- Password Config Page only allows client to configure Min and Max Lenth with lowest Min Length being 7
- Any change to Min or Max Length config will trigger the clients users to be forced to change password
- 6 Failed Login Attempts results in user be locked out. IsLockedOut=1 in Users table
- After a user is locked out, they can wait 30 min and login again if they know their password. Manually unlocking themselves.
- If Locked out and forgot password, Administrator can reset password with link in User Admin or access the route `/ui/login/resetpassword/@UsernameToReset@`, only user with `CanAdministerAllSecurity` can access this route
- After administrator resets password, the user can login with temporary password from Admin. Then the user will be forced to Change Password again.
- The Change Password page is now at `/ui/login/change-password`. A user can change their password by access page through Change Password link in header.
- A user can only change password again after 48 hours have passecd since last password change.
- A user's password now must meet 3 of 4 conditions
  - UPPERCASE
  - lowercase
  - Number
  - Special Character `! @ # $ % & _`

## UI - EnSync (Optional)

> From Project Root where you cloned Definitive repos, run the following commands in Powershell

```cmd
cd Defi-UI\qap
yarn install
```

> We now need to make sure `dev` directory has correct Security Permissions needed for IIS
- With Windows Explorer browse to Defi-UI\qap. Right Click on dev directory and Click Properties
- Select Security Tab
- Need to make sure your Windows Login Account has full permissions
- Need to make sure the Users group has read permissions

> We also need to ensure QAP UI is running under an application pool
- In IIS, go to ui/qap
- Make this folder an Application
- In IIS, create a new application pool named ui-qap.
- Use the same settings as other ui* application pools: Integrated pipeline, no Framework version.
- Make it run as your user account
- Make sure the ui/qap application is using the ui-qap application pool just configured

**[⬆ back to top](#table-of-contents)**

## Docker

### Uninstall Definitive 3rd Party Dependencies Installed Locally

> Includes
- ElasticSearch
- RabbitMQ

### Build Docker Images and Start Docker Containers 

###### Definitive 3rd Party Dependencies
> This includes
- ElasticSearch
- RabbitMQ
- Redis
- DynamoDB

```cmd
./build.cmd up
```

`You will need to rerun the command if you restart your computer`

###### Definitive Microservice Apis

> Includes
- Defi-LockApi
- services-auth

```cmd
./build.cmd upApis
```

`You will need to rerun command if you restart your computer`

### Docker Cheatsheet

###### Delete all container created by docker-compose

```bash
$ docker rm `docker ps --no-trunc -aq`
```

###### Build docker-compose without cache

```bash
$ docker-compose build --no-cache
```

###### Purge containers and unused images

```bash
$ docker ps -q -a -f status=exited | xargs -n 100 docker rm -v

$ docker images -q --filter "dangling=true" | xargs -n 100 docker rmi
```

###### Clean all your docker cache ALL

```bash
$ docker rm $(docker ps -a -q)
$ docker rmi $(docker images -q)
$ docker volume rm $(docker volume ls |awk '{print $2}')
rm -rf ~/Library/Containers/com.docker.docker/Data/*@
```

**[⬆ back to top](#table-of-contents)**

## Redis App Locking

### Turn On Redis App Locking

> Make sure ran the following commands detailed in the Docker Section Above

```cmd
./build.cmd up
./build.cmd upApis
```

> Run the following SQL Query

```sql
UPDATE [Compass].[dbo].[CompassConfigSettings]
SET ConfigValue = 'True'
WHERE ConfigKey = 'ElastiCacheDealLock.Temp.Tech.UseElastiCacheForDealLock'
```

**[⬆ back to top](#table-of-contents)**