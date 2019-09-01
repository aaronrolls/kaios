# Changelog for 0.0.2

Bug Fixes:

- Fixed a bug where if the comic title was too long it would wrap and cover the 
comic
- Fixed a bug where the input box would stay focus even when you weren't using 
it. This caused the back button to miss behave
- The status bar now has the correct colour

Features:

- Added a Random Comic feature. You can now view a random xkcd comic
- Added a feature where the input placeholder now shows the current comic number
- If the title of the comic is over 24 character, it will now scroll in a 
marquee type fashion

Changes:

- The middle softkey is now the go button
- The input box is now a "text type, rather than a "number" type. This is 
because the Kai OS backspace does not work on number inputs. At least in my 
version
- Added an alert to let you know that the input box is now a "text" type
