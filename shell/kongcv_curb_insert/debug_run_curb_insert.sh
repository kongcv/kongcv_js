#!/bin/bash

appid='ATcs8k4nK1f2VFd69QtNHcuN'
appkey='bs5tH7T0alfJyepntY5Npy37'
input_file='./a.txt'
hour_meter_method_id='56373f1100b0ee7f5ee8355c'

sh kongcv_insert_parkdata.sh $appid $appkey $input_file $hour_meter_method_id
