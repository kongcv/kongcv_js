#!/bin/bash

app_id=${1}
if [ ! -n "$app_id" ]; then
    echo "param is null, app id"
    exit 1
fi

app_key=${2}
if [ ! -n "$app_key" ]; then
    echo "param is null, app key"
    exit 1
fi

input_file=${3}
if [ ! -n "$input_file" ]; then
    echo "param is null, input file"
    exit 1
fi

method_id=${4}
if [ ! -n "$method_id" ]; then
    echo "param is null, method id"
    exit 1
fi

line_num=0
while read line
do
    echo $line
    address=`echo $line|awk -F" " '{print $1}'`
    address_detail=`echo $line|awk -F" " '{print $2}'`
    park_description=`echo $line|awk -F" " '{print $3}'`
    price=`echo $line|awk -F" " '{print $4}'`
    latitude=`echo $line|awk -F" " '{print $5}'`
    longitude=`echo $line|awk -F" " '{print $6}'`
    
    echo $address
    echo $address_detail
    echo $park_description
    echo $price
    echo $latitude
    echo $longitude
    address_info=$address'&'$address_detail
    echo $address_info

    echo "line_num:$line_num"
    let line_num++
    sleep 0.1

    curl -X POST \
        -H "X-LC-Id:$app_id" \
        -H "X-LC-Key:$app_key" \
        -H "Content-Type: application/json" \
        -d '{
                "address" : "'$address_info'",
                "park_description" : "'$park_description'",
                "location" : {"__type" : "GeoPoint", "latitude":'$latitude', "longitude" : '$longitude'},
                "city":"北京市",
                "hire_method":[{"__type":"Pointer","className":"kongcv_hire_method","objectId":"'$method_id'"}],
                "hire_price":["'$price/小时'"],
                "hour_meter":'$price',
                "hire_time":["0"],
            }' \
    https://api.leancloud.cn/1.1/classes/kongcv_park_curb
done < $input_file
