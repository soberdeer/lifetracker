from django.contrib.auth.models import User, Group
from rest_framework import viewsets
from rest_api.serializers import UserSerializer, GroupSerializer, WeightSerializer
from polls.models import Weight


class UserViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows users to be viewed or edited.
    """
    queryset = User.objects.all().order_by('-date_joined')
    serializer_class = UserSerializer


class GroupViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows groups to be viewed or edited.
    """
    queryset = Group.objects.all()
    serializer_class = GroupSerializer

class WeightViewSet(viewsets.ModelViewSet):
	queryset = Weight.objects.all()
	serializer_class = WeightSerializer