<?php

namespace LiVue\Exceptions;

class ComponentRenderException extends LiVueException
{
    public function __construct(string $componentName, string $viewName, \Throwable $previous)
    {
        $origin = static::resolveOrigin($previous);

        $message = "LiVue component [{$componentName}] failed to render view [{$viewName}]"
            . ($origin !== null ? " (origin: {$origin})" : '')
            . ": {$previous->getMessage()}";

        parent::__construct($message, 0, $previous);
    }

    /**
     * Individua il file che ha realmente generato l'errore ("origin"), che di
     * solito NON è la view radice del componente ma una view/partial annidata:
     * senza questa informazione ogni pagina dello stesso tipo riporta la stessa
     * view (es. primix::pages.list-records) e l'errore è impossibile da
     * localizzare. Le view compilate vengono risolte al blade sorgente.
     */
    protected static function resolveOrigin(\Throwable $e): ?string
    {
        $frames = [['file' => $e->getFile(), 'line' => $e->getLine()]];

        foreach ($e->getTrace() as $frame) {
            if (isset($frame['file'])) {
                $frames[] = ['file' => $frame['file'], 'line' => $frame['line'] ?? 0];
            }
        }

        // Primo frame (il più profondo) riconducibile a una view.
        foreach ($frames as $frame) {
            $resolved = static::resolveViewPath($frame['file']);

            if ($resolved !== null) {
                return $resolved . ':' . $frame['line'];
            }
        }

        // Nessuna view coinvolta: riporta comunque il file dell'eccezione.
        return $e->getFile() . ':' . $e->getLine();
    }

    /**
     * Se il file è una view Blade compilata, ritorna il path del blade
     * sorgente estratto dal marker "PATH ... ENDPATH" che il compiler Laravel
     * appende in coda al file compilato; se è già un blade sorgente lo
     * ritorna com'è.
     */
    protected static function resolveViewPath(string $file): ?string
    {
        if (str_ends_with($file, '.blade.php')) {
            return $file;
        }

        // View compilate: storage/framework/views/<hash>.php
        $isCompiledView = str_contains(
            str_replace('\\', '/', $file),
            'framework/views/'
        );

        if (! $isCompiledView || ! is_file($file)) {
            return null;
        }

        $tail = @file_get_contents($file, false, null, max(0, filesize($file) - 512));

        if ($tail !== false && preg_match('#/\*\*PATH (.+?) ENDPATH\*\*/#s', $tail, $matches)) {
            // La riga resta quella del file compilato: Blade mantiene una
            // parità di riga solo approssimativa, ma il file è quello giusto.
            return trim($matches[1]);
        }

        return $file;
    }
}
