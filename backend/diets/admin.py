from django.contrib import admin

from .models import Diet, Supplement, DietSupplement, PriceHistory


admin.site.register(Diet)
admin.site.register(Supplement)
admin.site.register(DietSupplement)
admin.site.register(PriceHistory)
