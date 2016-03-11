#!/bin/bash

appid='VP7sLsNOMOYHn4cHMzV4KcgG-gzGzoHsz'
appkey='jVfxeSyYnzW4sBHNlVK6l3s3'
input_file='kongcv_beijing_curb_2015.txt'
hour_meter_method_id='568ca30f00b01b9f12ac589f'

./kongcv_insert_parkdata.sh $appid $appkey $input_file $hour_meter_method_id
