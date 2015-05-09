from django.conf.urls import url
from rest_framework.urlpatterns import format_suffix_patterns
from calories import views

urlpatterns = [
    url(r'^calories/$', views.CaloriesList.as_view()),
    url(r'^calories/(?P<pk>[0-9]+)/$', views.CaloriesDetail.as_view()),
]

urlpatterns = format_suffix_patterns(urlpatterns)
