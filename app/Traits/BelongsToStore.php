<?php

namespace App\Traits;

use App\Models\Store;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

trait BelongsToStore
{
    protected static function bootBelongsToStore(): void
    {
        static::creating(function ($model) {
            if (auth()->check() && auth()->user()->store_id) {
                $model->store_id = auth()->user()->store_id;
            }
        });

        static::addGlobalScope('store', function (Builder $builder) {
            if (auth()->check() && auth()->user()->store_id) {
                $builder->where($builder->getModel()->getTable() . '.store_id', auth()->user()->store_id);
            }
        });
    }

    public function store(): BelongsTo
    {
        return $this->belongsTo(Store::class);
    }
}
