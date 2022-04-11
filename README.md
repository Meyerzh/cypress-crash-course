README
======
#Use Vagrant Development Environment.(If docker is not supported on your computer or you don't want to use docker in your hosts computer)

## Prepare Host Machine

1. Install/Update Git, Vagrant, Virtualbox

2. Install ‘NFS Server' (Linux Only)

## Update Git Hooks


1. Run composer install

2. Link the git hooks to:

    cd to root directory, then run below command:

        1. ./source/vendor/bin/phpcs --config-set installed_paths source/vendor/drupal/coder/coder_sniffer
        2. cd .git/hooks 
        3. ln -s ../../devops/scripts/git-hooks/commit-msg .
        4. ln -s ../../devops/scripts/git-hooks/pre-commit .
        

## Set Up Development Environment

### Use Virtualbox

1. Update GEM source [Optional]

    Install gem package within China is extremely slow, has to use mirror inside China, https://ruby.taobao.org.

    * Version 1.8.0 older

        Run `which vagrant` within Cygwin shell to get vagrant installation location. Locate `embedded/gems/gems/vagrant-*/lib/vagrant/bundler.rb` in the vagrant installation location, replace all `https://rubygems.org` with `https://ruby.taobao.org`, delete line `gemfile.puts(%Q[source "http://gems.hashicorp.com"])`.

        It has be done this way because Vagrant before 1.8.0 does not provide any option to change its builtin gem's sources

    * Version 1.8.0 and newer

        Use `vagrant plugin install --plugin-clean-sources --plugin-source https://ruby.taobao.org [PLUGIN]` to intall the plugin.

    See <http://ruby.taobao.org/>

2. Install 'vagrant-winnfsd' (Windows Only)

    `vagrant plugin install vagrant-winnfsd`

    See <https://github.com/winnfsd/vagrant-winnfsd>

3. Install 'vagrant-hostmanager'.

    `vagrant plugin install vagrant-hostmanager`

    See <https://github.com/devopsgroup-io/vagrant-hostmanager>.

4. Grant write permissions to everyone of the following file

    C:\\windows\system32\etc\hosts

5.Setup the environment variables
* Make sure the .env file is existed under the devops folder, if not you can copy from devops/templates/.env.tpl. And complete&fill the envirionment values in your .evn file, see the complete environment variables below
```ini
    COMPOSE_PROJECT_NAME=cmdb
    PROJECT_KEY=cmdb
    PHP_VERSION=7.1
    MYSQL_VERSION=5.6.41
    MYSQL_DB_NAME=your_db_name
    MYSQL_USER=your_db_user
    # It's required only when your project is managed by composer
    COMPOSER_FOLDER_PATH="/absolute_path_to_your_project/source"
    # It's required only when your resource(JS/CSS/Images) files are needed to be built by node
    NODE_FOLDER_PATH="/absolute_path_to_your_project/source/docroot/sites/all/themes/custom/theme_name"
```
6. Setup the docker-compose.override.yml file
Copy devops/templates/docker-compose.override.yml.tpl to your devops folder with name "docker-compose.override.yml". Make any addtional changes according to your local environment, see an example below
```yml
version: '2'

services:
  web-server: 
    volumes:
      - ../source/docroot:/var/www/html/
    ports:
      - "80:80"
```
* [Optional] If you want to use your local database inside the docker container, you need to make sure the docker-compose.override.yml file is created under the devops folder. And append the envirionment values ( MYSQL_PASSWORD, MYSQL_ROOT_PASSWORD ) under database section in the docker-compose.override.yml file. see an example below
```yml
  database:
    environment:
      - MYSQL_PASSWORD=your_password
      - MYSQL_ROOT_PASSWORD=your_password
```

7. Boot the machine

    `vagrant up`

8. Other Operations

    `vagrant ssh`
    
 then change to ~/source folder, execute commands follow docker section below.

#Use Docker Development Environment.(Recommended option)
## Prerequisites
### Install docker and docker-compose on host machine
* Ubuntu
    - Install docker: https://docs.docker.com/install/linux/docker-ce/ubuntu/#install-docker-ce
    - Install docker-compose: docker composer：https://docs.docker.com/compose/install/#install-compose

* Windows 10 Professional or Enterprise
    - https://docs.docker.com/docker-for-windows/install/

* Mac OS
    - https://docs.docker.com/docker-for-mac/install/

### Setup the environment variables
* Make sure the .env file is existed under the devops folder, if not you can copy from devops/templates/.env.tpl. And complete&fill the envirionment values in your .evn file, see the complete environment variables below
```ini
    COMPOSE_PROJECT_NAME=cmdb
    PROJECT_KEY=cmdb
    PHP_VERSION=7.1
    MYSQL_VERSION=5.6.41
    MYSQL_DB_NAME=your_db_name
    MYSQL_USER=your_db_user
    # It's required only when your project is managed by composer
    COMPOSER_FOLDER_PATH="/absolute_path_to_your_project/source"
    # It's required only when your resource(JS/CSS/Images) files are needed to be built by node
    NODE_FOLDER_PATH="/absolute_path_to_your_project/source/docroot/sites/all/themes/custom/theme_name"
```
### Setup the docker-compose.override.yml file
Copy devops/templates/docker-compose.override.yml.tpl to your devops folder with name "docker-compose.override.yml". Make any addtional changes according to your local environment, see an example below
```yml
version: '2'

services:
  nginx:
    ports:
      - "8100:80"
      - "443:443"

  web-server: 
    volumes:
      - ../source/docroot:/var/www/html/
    ports:
      - "8300:80"
```
* [Optional] If you want to use your local database inside the docker container, you need to make sure the docker-compose.override.yml file is created under the devops folder. And append the envirionment values ( MYSQL_PASSWORD, MYSQL_ROOT_PASSWORD ) under database section in the docker-compose.override.yml file. see an example below
```yml
  database:
    environment:
      - MYSQL_PASSWORD=your_password
      - MYSQL_ROOT_PASSWORD=your_password
```
# Manage local environment
## Startup the docker containers
```bash
[Linux, MacOS]: ./devops/scripts/docker.sh start
[Windows 10]: devops\scripts\win_docker.bat start
```
Access your local website, the ports below are depended on what you have configured in your docker-compose.override.yml file.
* Web server: http://localhost:8300
* Nginx: http://localhost:8100

### Local development commands
* Stop/destory your docker containers
```bash
    [Linux, MacOS]: ./devops/scripts/docker.sh stop
    [Linux, MacOS]: ./devops/scripts/docker.sh down
    [Windows 10]: devops\scripts\win_docker.bat stop
    [Windows 10]: devops\scripts\win_docker.bat down
``` 
* Execute Drush command
```bash
    [Linux, MacOS]: ./devops/scripts/drush.sh status
    [Windows 10]: devops\scripts\win_drush.bat status
```
* Execute composer command
```bash
    [Linux, MacOS]: ./devops/scripts/composer.sh install
    [Linux, MacOS]: ./devops/scripts/composer.sh update
    [Windows 10]: devops\scripts\win_composer.bat install
    [Windows 10]: devops\scripts\win_composer.bat update
```
* Execute Node commands
```bash
    [Linux, MacOS]: ./devops/scripts/node.sh npm install
    [Linux, MacOS]: ./devops/scripts/node.sh npm run build
    [Windows 10]: devops\scripts\win_node.bat install
    [Windows 10]: devops\scripts\win_node.bat npm run build
```
* Flush Varnish/Memcache cache
```bash
    [Linux, MacOS]: ./devops/scripts/flush_cache.sh
    [Windows 10]: devops\scripts\win_flush_cache.bat
```
