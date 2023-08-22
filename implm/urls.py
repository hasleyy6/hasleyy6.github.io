from django.urls import path
from . import views

urlpatterns=[
    path("", views.index, name="index"),
    path("automatic", views.automatic, name="automatic"),
    path("manual", views.manual, name="manual"),
    path("getName", views.getName, name="getName"),
    path("getRole", views.getRole, name="getRole"),
    path("getGoals", views.getGoals, name="getGoals"),
    path("getSteps", views.getSteps, name="getSteps"),
    path("execute", views.execute, name="execute")
]