# Readable App

To get started right away, choose an installation directory, for example, `installdir`.

* Create the installation directory
    - `mkdir installdir`

* Install the API server and readable app from the github repository
    - `cd installdir`
    - `git clone https://github.com/quickrworld/readables.git`

* Start the API server
    - `cd readables/api-server`
    - `npm install`
    - `node server`
    
* In another terminal window, start the frontend app.
    - change your working directory to the installation directory installdir. For example, if you created installdir in your home directory
        - `cd ~/installdir`
    - `cd installdir/readables`
    - `cd readables/frontend`
    - `npm install`
    - `npm start`

#### Note: `installdir` can be any directory where you want to install the frontend application and the API server
#### Note: You must have write permissions in the working directory when you create `installdir`
#### Note: Windows users may have to modify the commands for the Windows environment
