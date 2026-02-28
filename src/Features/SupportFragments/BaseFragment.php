<?php

namespace LiVue\Features\SupportFragments;

use Attribute;
use LiVue\Attribute as LiVueAttribute;

/**
 * Mark a component method as affecting specific template fragments.
 *
 * When a method annotated with #[Fragment('name')] is called via AJAX,
 * the server renders the full template but only extracts and sends the
 * marked fragment sections. The client patches its cached template with
 * the new fragments and performs the normal swap.
 *
 * Useful for operations like opening/closing modals where only a small
 * section of the template changes, avoiding sending the entire HTML.
 *
 * Usage:
 *   #[Fragment('modal')]
 *   public function openModal(): void { ... }
 *
 *   #[Fragment('modal', 'sidebar')]
 *   public function updateBoth(): void { ... }
 */
#[Attribute(Attribute::TARGET_METHOD | Attribute::IS_REPEATABLE)]
class BaseFragment extends LiVueAttribute
{
    public array $names;

    public function __construct(string ...$names)
    {
        $this->names = $names;
    }
}
