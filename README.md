robot

### Execute
  1. Unzip the package to a folder
  2. Goto the folder with command terminal and run 'npm -install' for the first time
  3. Run 'npm -start' to start the program
  4. If the web page is not poped up automatically, go to 'http://localhost:3000' in browser


### Configurations
  1. All configurations are in the UI panel to the left
  2. Start with a room shape
  3. You also need to give a r value for map dimension. NOTE: map will only be generated with a proper size, however, the position calculation will still work when map is too big.
  4. If start position is not given, (0, 0) north will be used as default
  5. You can switch English/Swedish command input with 'English/Swedish Commands' button
  6. Input Command will be checked if valid, then press 'Start' button to move it, move it.
  7. Arrow buttons allow you to control the robot move manually, only visible when r is set.

### Map and Robot
  1. Hisotry movement will be logged underneath the map, when move is not possible, the move will be logged in red.  
  2. Robot coordinates and direction is always shown below.