import base64
import os
import urllib.request
import boto3
from datetime import datetime
s3_client = boto3.client("s3", aws_access_key_id=os.environ['AWS_ACCESS'], aws_secret_access_key=os.environ['AWS_SECRET'])
client_id = "xhsr2ijg89"
client_secret = "bmUlMLuKzMdfgQoOFfzfCNrgZd6dwJTuK9ThsIIa"
url = "https://naveropenapi.apigw.ntruss.com/voice/v1/tts"


def get_tts(text):
    encText = urllib.parse.quote(text)
    data = "speaker=mijin&speed=0&text=" + encText;
    request = urllib.request.Request(url)
    request.add_header("X-NCP-APIGW-API-KEY-ID", client_id)
    request.add_header("X-NCP-APIGW-API-KEY", client_secret)
    response = urllib.request.urlopen(request, data=data.encode('utf-8'))
    rescode = response.getcode()
    if (rescode == 200):
        # print("TTS mp3 저장")
        response_body = response.read()
        return response_body
        # with open('1111.mp3', 'wb') as f:
        #     f.write(response_body)
    else:
        print("Error Code:" + rescode)


def test_papago():
    print(get_record_file(record_data=get_tts("그런 눈으로 저를 쳐다보지 마세요!")))
    print(get_record_file(record_data=get_tts("무슨 일 있어요? 왜이렇게 놀라고 그래요?")))
    print(get_record_file(record_data=get_tts("오늘 무슨 기분 좋은 일이 있었나 봐요? 제게 들려주실래요?")))
    print(get_record_file(record_data=get_tts("저를 경멸하지 말아주세요... 그런눈으로 보지 마시라니까요?")))
    print(get_record_file(record_data=get_tts("슬픈 일이 있었군요.. 제게 말해줄 수 있나요?")))
    print(get_record_file(record_data=get_tts("자, 심호흡을 해 볼까요? 들이마시고 ~ 내쉬고 들이마시고~ 내쉬고")))
    print(get_record_file(record_data=get_tts("음? 오늘은 평범한 하루였군요? 수고했어요!")))
    print(get_record_file(record_data=get_tts("무슨 일이예요?! 경찰은 112! 소방서는 119! ")))



def get_record_file(record_data):
    key_name = 'reply_ment.'+str(datetime.now().timestamp()) + '.mp3'
    s3_client.put_object(ACL='public-read', Body=record_data, Key=key_name,
                         Metadata={'Content-Type': 'audio/mpeg'}, Bucket='ryun.capstone')

    return 'https://s3.ap-northeast-2.amazonaws.com/ryun.capstone/' + key_name