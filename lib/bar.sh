#!/bin/bash

# # ETHERNET: get the current number of bytes in and bytes out
# ethernetIn0=`netstat -ibn | grep -e "en0" -m 1 | awk '{print $7}'` #  bytes in
# ethernetOut0=`netstat -ibn | grep -e "en0" -m 1 | awk '{print $10}'` # bytes out

# #wait one second
# sleep 1

# # ETHERNET: get the number of bytes in and out one second later
# ethernetIn1=`netstat -ibn | grep -e "en0" -m 1 | awk '{print $7}'` # bytes in again
# ethernetOut1=`netstat -ibn | grep -e "en0" -m 1 | awk '{print $10}'` # bytes out again

# # ETHERNET: find the difference between bytes in and out during that one second
# netIn=$(($ethernetIn1 - $ethernetIn0))
# netOut=$(($ethernetOut1 - $ethernetOut0))

# # ETHERNET: convert bytes to kilobytes
# ethernetInKb=`echo "scale=2; $netIn/1024;" | bc`
# ethernetOutKb=`echo "scale=2; $netOut/1024;" | bc`

# #AIRPORT: get IP address
# ethernetIp=`ifconfig en0 | grep -E "(inet |status:)" | head -n 1 | awk '{ print $2}'`

DATETIME=$(LANG=ja_JP date +"%m-%d %A %H:%M")

BATTERY_PERCENTAGE=$(pmset -g batt | egrep '([0-9]+\%).*' -o --colour=auto | cut -f1 -d'%')
BATTERY_STATUS=$(pmset -g batt | grep "'.*'" | sed "s/'//g" | cut -c 18-19)
BATTERY_REMAINING=$(pmset -g batt | egrep -o '([0-9]+%).*' | cut -d\  -f3)

BATTERY_CHARGING=""
if [ "$BATTERY_STATUS" == "Ba" ]; then
  BATTERY_CHARGING="false"
elif [ "$BATTERY_STATUS" == "AC" ]; then
  BATTERY_CHARGING="true"
fi

LOAD_AVERAGE=$(sysctl -n vm.loadavg | awk '{print $2}')
CPU_USAGE=$(ps -A -o %cpu | awk '{s+=$1} END {printf("%.2f",s/8);}')
MEMORY_USAGE=$(memory_pressure | grep memory | cut -c 37-38)

WIFI_STATUS=$(ifconfig en0 | grep status | cut -c 10-)
WIFI_SSID=$(networksetup -getairportnetwork en0 | cut -c 24-)

# DND=$(defaults -currentHost read com.apple.notificationcenterui doNotDisturb)

# YABAI_SPACES=$(yabai -m query --spaces)

echo $(cat <<-EOF
{
  "datetime": "$DATETIME",
  "battery": {
    "percentage": $BATTERY_PERCENTAGE,
    "charging": $BATTERY_CHARGING,
    "remaining": "$BATTERY_REMAINING"
  },
  "cpu": {
    "loadAverage": $LOAD_AVERAGE,
    "usage": $CPU_USAGE
  },
  "memory": {
    "free": $MEMORY_USAGE
  },
  "wifi": {
    "status": "$WIFI_STATUS",
    "ssid": "$WIFI_SSID"
  }
}
EOF
)