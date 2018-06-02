from PIL import Image


def test_transpose():
    img = Image.open('../tired.jpeg')
    print(img.transpose(Image.ROTATE_90).tobytes())
