#!/bin/bash

#last_date=`date -d last-day +%Y-%m-%d`
last_date='2016-02-28'
echo $last_date
appid='ATcs8k4nK1f2VFd69QtNHcuN'
appkey='bs5tH7T0alfJyepntY5Npy37'

./kongcv_trade_loop.sh $appid $appkey $last_date
