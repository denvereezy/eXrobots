# eXrobots

Controll the LED from the Browser using Express and Socket.io

## Required

* Arduino
* Breadboard
* LED
* 330 ohm Resistor x 1
* Jumper Wires >= 6
* Trimpot  (Trimmer Potentiometer x 1)

## led_dim.js Setup Diagram

[How to Setup led_dim Diagram ](https://github.com/denvereezy/eXrobots/wiki/led_dim.js)

## Steps

* `git clone https://github.com/denvereezy/eXrobots.git`
* `cd eXrobots`
* `cd slider`
* `npm install`
* `node app.js`
* Open your Browser and go to [http://localhost:8060 ](http://localhost:8060/)

For easy restarts you can `npm install -g nodemon` globally or locally with  `npm install --save-dev nodemon`

# Future Plans

* Add Buttons in the Browser to turn LED `on` and `off`
* Make the potentiometer controll the slider in the HTML when adjusting the brightness from it
