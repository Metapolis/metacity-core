#  Metacity

L'application Portail Metacity est développée en typescript à l'aide de Inversify, et Express.

### 1 - Installation des outils
	
#### NodeJS et Node Package Manager (NPM)

Installer Node.js (7.7.1) et NPM depuis l'installeur disponible à l'adresse suivante : [http://nodejs.org/download/](http://nodejs.org/download/)
A l'issue de l'installation les commandes `node`et `npm` doivent être disponibles.

#### PostgreSQL

    sudo pacman -S postgresql

Se connecter en tant qu'utilisateur postgres:

    sudo -u postgres -i
    
Initialiser /!\ uniquement apres une 1ere installation

    initdb --locale $LANG -E UTF8 -D '/var/lib/postgres/data'
    
Creer le role et la base de donne metacity

    [postgres]$ createuser --interactive
    
    [postgres]$ createdb metacity

#### Ruby

    sudo pacman -S ruby
    
Modifier `~/.zshrc` ou `~/.config/fish/fish.config` ou `~/.bashrc` selon votre religion.

    ```
        ## Ruby
        export PATH="$HOME/.gem/ruby/2.4.1/bin:$PATH"
    ```
    
Redemarrer le terminal

### 2 - Avant de démarrer

#### Installer les vendors

Installer les module node :

    npm install
    
Installer les gems ruby

    gem install sass
	
#### Compiler le projet

Compiler le projet :

    npm run build

Possibilité de faire une compilation légère avec seulement les fichiers client : 

    npm run build:light:client

#### Lancer le serveur

Commande de lancement :

	npm run start
