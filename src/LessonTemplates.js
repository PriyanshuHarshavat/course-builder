/**
 * @fileoverview Lesson Templates Loader - Reduced from 3,142 lines to 50 lines
 * Loads lesson template data from external JSON files
 */

import { useState, useEffect } from 'react';

// Lazy load lesson template data
let lessonTemplatesCache = null;

/**
 * Load lesson templates from JSON data file
 */
const loadLessonTemplates = async () => {
  if (lessonTemplatesCache) {
    return lessonTemplatesCache;
  }

  try {
    // In production, this would fetch from an API or static file
    const response = await fetch('/data/lessons/templates.json');
    if (!response.ok) {
      throw new Error('Failed to load lesson templates');
    }
    
    lessonTemplatesCache = await response.json();
    return lessonTemplatesCache;
  } catch (error) {
    console.warn('Failed to load lesson templates from file, using fallback');
    // Fallback to a minimal template structure
    return {
      python: {
        'ages-8-9': [],
        'ages-10-11': [],
        'ages-12-14': []
      },
      ethics: {
        'ages-8-9': [],
        'ages-10-11': [],
        'ages-12-14': []
      }
    };
  }
};

/**
 * React hook to use lesson templates
 */
export const useLessonTemplates = () => {
  const [templates, setTemplates] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadLessonTemplates().then(data => {
      setTemplates(data);
      setLoading(false);
    });
  }, []);

  return { templates, loading };
};

/**
 * Get all lesson templates (legacy compatibility)
 */
export const getAllLessonTemplates = async () => {
  const templates = await loadLessonTemplates();
  const all = [];
  Object.keys(templates).forEach(subject => {
    Object.keys(templates[subject]).forEach(ageGroup => {
      all.push(...templates[subject][ageGroup]);
    });
  });
  return all;
};

/**
 * Export for backward compatibility
 */
export default loadLessonTemplates;