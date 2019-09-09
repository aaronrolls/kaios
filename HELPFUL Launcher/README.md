# The HELPFUL Launcher (Alpha)

The HELPFUL launcher is a project of mine to turn the Kai OS launcher into a 
more helpful alternative.
My current goal is to have it functioning like the launchers you see on Symbian 
40.

## Features:

### Custom Shortcuts:

- Your arrow keys and softkeys can all be mapped to your liking. You can open 
any app or you can try out some of the custom functions
- All of the above mentioned keys have two possible options, "long" or 
"short". This gives you 12 possible shortcuts to work with
- Custom functions
    - "torch" : Turns the torch on
    - "notifications" : Opens notifications
    - "quicksettings" : Opens quick settings / "Shortcuts" default

**Better navigation of the app list:**

- You can now navigate the app list with your number keys
- Each number (1-9) will jump to the app that it corresponds to on the grid or 
list.
- The "*" key will take you to the next page.
- For example, if you wanted to open the center app on the third page, you 
would push, * * 5 Enter

**Human Error proof:**

- If you make any mistakes with the JSON file that holds your shortcuts, the 
launcher will work as normal.

### Bugs:

- The "quicksettings" custom function has a small bug. If you launch it and go 
back to the home screen, the next button you press will not register.
- (Not really a bug) Number navigation can only be used for launching apps, 
not uninstalling or moving apps.

### Customise Shortcuts:

The shortcuts are contained in a JSON file (custom-shortcuts.json) and should be 
located at the root directory of the HELPFUL launchers application.zip file.

The shortcut file looks like this:

```

{
    "ArrowUp":{
        "long": "torch",
        "short": "calendar.gaiamobile.org"
        },
    "ArrowDown":{
        "long": "search.gaiamobile.org",
        "short": "contact.gaiamobile.org"
        },
    "ArrowLeft":{
        "long": "email.gaiamobile.org",
        "short": "sms.gaiamobile.org"
        },
    "ArrowRight":{
        "long": "files.gerda.tech",
        "short": "notes.gaiamobile.org"
        },
    "SoftLeft":{
        "long": "calculator.gaiamobile.org",
        "short": "notifications"
        },
    "SoftRight":{
        "long": "settings.gaiamobile.org"
        }
   
}
```


Each button can ether have a "long" or a "short" option. If you remove ether 
option or even the entire button, the button will revert to its default action 
as defined by Kai OS.

"long" = long press

"short" = normal press

If you want to launch an app, ether "long" or "short" should contain the app 
name
If you want to add a custom function like turning the torch on, add the function 
name ("torch") in place of an app name

Once you are finished, save the file as custom-shortcuts.json and add to your 
application.zip file.

If you want the default functionality of the RightSoft key (the "Shortcuts" key) 
it is recommended that you remove the "short" option instead of using the 
"quicksettings" custom function.

If nothing works after you have followed my instructions, check if you missed a 
comma somewhere, that would throw an error.

### Install:

### Warnings:

- This will only work with Nokia 8110's that have root access.
- I have only tried this out on Gerda OS which is v13 of the 8110's software. 
It may not work on v16 or anything above v13.
- This is a try at your own risk mod of the Kai OS launcher, I am not 
responsible for any harm it may (but probably won't do) to your device

#### How To:

1. Download HELPFUL Launcher, it will be called application.zip-
2. Add your custom-shortcuts.json file to the application.zip
3. Plug your phone into your computer and insure that debugging is turned on
4. Navigate to the directory that has the application.zip you downloaded
5. Open your terminal or command prompt
6. Backup your current launcher be running this  
```
adb pull /system/b2g/webapps/launcher.gaiamobile.org/ 
```
7. Once that has finish, install HELPFUL Launcher with this command  
```
adb push application.zip /system/b2g/webapps/launcher.gaiamobile.org/
```
8. Reboot your phone  
```
adb reboot
```
9. Leave a review or report bugs if you find them
