<?php

namespace App\Http\Traits;

trait CanLoadRelationships
{
    /**
     * Load specified relationships on a model or collection.
     *
     * @param mixed $model
     * @return mixed
     */
    public function loadRelationships($model)
    {
        if (method_exists($this, 'relationships')) {
            $relationships = $this->relationships();
            return $model->load($relationships);
        }

        return $model;
    }
}
