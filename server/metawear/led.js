// var MetaWear = require('metawear');

// console.log('Looking for a device');

// MetaWear.discover(function(device) {
//   device.connectAndSetUp(function(error) {
//     var pattern = new MetaWear.LedPattern();
//     MetaWear.mbl_mw_led_load_preset_pattern(pattern.ref(), MetaWear.LedPreset.BLINK);
//     MetaWear.mbl_mw_led_write_pattern(device.board, pattern.ref(), MetaWear.LedColor.GREEN);
//     MetaWear.mbl_mw_led_play(device.board);
//     // After 5 seconds we reset the board to clear the LED, when we receive
//     // a disconnect notice we know the reset is complete, so exit the program
//     setTimeout(function() {
//       device.on('disconnect', function() {
//         process.exit(0);
//       });
//       MetaWear.mbl_mw_debug_reset(device.board);
//     }, 5000);
//   });
// });

// const noble = require('noble');
// noble.on('stateChange', function(state) {
//   console.log('stateChange:');
//   console.log(state);
//   if (state == 'poweredOn') {
//     scan();
//   }
// });

// function scan() {
//   noble.startScanning([], true, function(found) {
//     console.log('found:');
//     console.log(found);
//   });
// }

/*
  Bruce: EA:D1:6A:11:EA:11
*/
const bruce = 'EA:D1:6A:11:EA:11';
const MetaWear = require('metawear');
console.log(MetaWear.discover);

// If you know the MAC address, you can uncomment this line
MetaWear.discoverByAddress(bruce, function(device) {
  console.log('Found:');
  console.log(device);
});

//   MetaWear.discover(function(device) {
//   console.log('got em');
//   // you can be notified of disconnects
//   device.on('disconnect', function() {
//     console.log('we got disconnected! :( ');
//   });
// });
