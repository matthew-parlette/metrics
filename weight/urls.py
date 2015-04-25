from django.conf.urls import url
from rest_framework.urlpatterns import format_suffix_patterns
from weight import views

urlpatterns = [
    url(r'^weight/$', views.WeightList.as_view()),
    url(r'^weight/(?P<pk>[0-9]+)/$', views.WeightDetail.as_view()),
]

urlpatterns = format_suffix_patterns(urlpatterns)
