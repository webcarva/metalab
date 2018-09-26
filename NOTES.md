# NOTES 

## Overview

All functionality appears to be working. Styles match UI/UX expectations

## Comments

 * I needed to install babel-core to get this working on my machine... Not sure if that was a part of the test.
 * Given more time I think I'd move the Items to a dummy component and pass redux functionality down to it. Keeping redux and functionality on the parent component and passing functionality down to it is my preference.
 * I haven't used any CSS preprocessers :o I know, to be honest once I'd made a start I was quite enjoying wiriting CSS for a change of pace (I've been using lots of JSS lately so this was a breath of fresh air). If this was a project, I would generate my CSS from LESS/SASS/JSS and isolate imports to individual classes (create a base theme file with generic rules and variables, separate other components styles into their own mobules, create namespacing and reduces re-writing styles)
 * I haven't written any tests for this - the instructions suggested that  the npm test is the linter??
 * I've left the table in place (shock) for desktop but this actually what tables meant to be used for in HTML (providing you don't want/need it to be SEO friendly). I have created a mobile friendly solution for when thing's get small.