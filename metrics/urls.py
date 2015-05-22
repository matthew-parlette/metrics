from django.conf.urls import patterns, include, url

from django.contrib import admin
from metrics import views
admin.autodiscover()

urlpatterns = patterns('',
    # Examples:
    # url(r'^$', 'metrics.views.home', name='home'),
    # url(r'^blog/', include('blog.urls')),

    url(r'^admin/', include(admin.site.urls)),
    url(r'^$', views.index),
    url(r'^', include('weight.urls')),
    url(r'^', include('bodyfat.urls')),
    url(r'^', include('calories.urls')),
    url(r'^', include('food.urls')),
)
