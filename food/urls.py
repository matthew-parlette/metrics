from django.conf.urls import url
from rest_framework.urlpatterns import format_suffix_patterns
from food import views

urlpatterns = [
    url(r'^food/$', views.FoodList.as_view()),
    url(r'^food/(?P<pk>[0-9]+)/$', views.FoodDetail.as_view()),
]

urlpatterns = format_suffix_patterns(urlpatterns)
