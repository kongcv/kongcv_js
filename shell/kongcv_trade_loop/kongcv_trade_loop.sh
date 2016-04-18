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

loop_date=${3}
if [ ! -n "$loop_date" ]; then
    echo "param is null, loop date"
    exit 1
fi

skip=0
limit=2

function get_data_from_json() {
    mode=$1

    ./JSON.sh < $2 > tmp_a

    if [ "post" == $mode ]; then
        grep '\[\"result\"\]' tmp_a > tmp_b
    fi

    awk -F'\t' '{print $2}' tmp_b > tmp_c
 
    result=`sed 's/"//g' tmp_c`
    rm tmp_*
    
    echo $result
}

while :
do 
    curl -X POST \
        -H "X-LC-Id:$app_id" \
        -H "X-LC-Key:$app_key" \
        -H "Content-Type: application/json" \
        -d '{"current_date":"'$loop_date'","skip":"'$skip'","limit":"'$limit'"}' \
    https://api.leancloud.cn/1.1/functions/kongcv_loop_trade > ret_loop.txt
    
    result=$(get_data_from_json post ret_loop.txt)
    
    if [ "no_results" == $result ]; then
        echo "loop finished, skip:$skip"
        break
    fi
    
    if [ "error" == $result ]; then
        echo "loop error, skip:$skip"
        break
    fi

    skip=$[$skip + $limit]
    echo $skip
    
    #sleep 100 millisecond
    sleep 0.1
done
