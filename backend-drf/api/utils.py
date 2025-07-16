from django.conf import settings
import matplotlib.pyplot as plt
import os


def save_plot(image_name):
    image_path = os.path.join(settings.MEDIA_ROOT, image_name)
    plt.savefig(image_path)
    plt.close()
    image_url = settings.MEDIA_URL + image_name
    return image_url
