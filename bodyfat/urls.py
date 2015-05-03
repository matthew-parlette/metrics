from django.conf.urls import url
from rest_framework.urlpatterns import format_suffix_patterns
from bodyfat import views

urlpatterns = [
    url(r'^bodyfat/$', views.BodyFatList.as_view()),
    url(r'^bodyfat/(?P<pk>[0-9]+)/$', views.BodyFatDetail.as_view()),
]

urlpatterns = format_suffix_patterns(urlpatterns)
