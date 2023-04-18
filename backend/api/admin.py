from django.contrib import admin

from api.models import (
    Animal,
    Category,
    Cost,
    Diet,
    Group,
    Phase,
    PriceHistory,
    Sector,
    Supplement,
    Weight,
    DietSupplement
)

# Register your models here.
admin.site.register(Animal)
admin.site.register(Category)
admin.site.register(Cost)
admin.site.register(Diet)
admin.site.register(Group)
admin.site.register(Phase)
admin.site.register(PriceHistory)
admin.site.register(Sector)
admin.site.register(Supplement)
admin.site.register(Weight)
admin.site.register(DietSupplement)
