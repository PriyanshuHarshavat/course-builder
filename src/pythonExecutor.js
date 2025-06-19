// Python Execution Service using Pyodide
class PythonExecutor {
  constructor() {
    this.pyodide = null;
    this.isInitialized = false;
    this.isInitializing = false;
    this.initPromise = null;
  }

  async initialize() {
    if (this.isInitialized) {
      return this.pyodide;
    }

    if (this.isInitializing) {
      return this.initPromise;
    }

    this.isInitializing = true;
    this.initPromise = this._loadPyodide();
    
    try {
      this.pyodide = await this.initPromise;
      this.isInitialized = true;
      this.isInitializing = false;
      return this.pyodide;
    } catch (error) {
      this.isInitializing = false;
      throw error;
    }
  }

  async _loadPyodide() {
    try {
      // Load Pyodide from CDN directly
      if (!window.loadPyodide) {
        // Dynamically load Pyodide from CDN
        await this._loadPyodideScript();
      }
      
      const pyodide = await window.loadPyodide({
        indexURL: "https://cdn.jsdelivr.net/pyodide/v0.27.7/full/",
        stdout: (text) => {
          // Capture stdout for our custom output handling
          this.lastOutput = (this.lastOutput || '') + text + '\n';
        },
        stderr: (text) => {
          // Capture stderr for error handling
          this.lastError = (this.lastError || '') + text + '\n';
        }
      });

      // Install common packages that kids might use (optional)
      try {
        await pyodide.loadPackage(['numpy']);
      } catch (err) {
        console.warn('Some packages failed to load:', err);
      }

      return pyodide;
    } catch (error) {
      console.error('Failed to load Pyodide:', error);
      throw new Error('Failed to initialize Python environment. Please refresh the page and try again.');
    }
  }

  async _loadPyodideScript() {
    return new Promise((resolve, reject) => {
      if (window.loadPyodide) {
        resolve();
        return;
      }

      const script = document.createElement('script');
      script.src = 'https://cdn.jsdelivr.net/pyodide/v0.27.7/full/pyodide.js';
      script.onload = () => resolve();
      script.onerror = () => reject(new Error('Failed to load Pyodide script'));
      document.head.appendChild(script);
    });
  }

  async executeCode(code, options = {}) {
    const { timeout = 5000, maxOutputLength = 10000 } = options;

    try {
      if (!this.isInitialized) {
        await this.initialize();
      }

      // Clear previous output
      this.lastOutput = '';
      this.lastError = '';

      // Add timeout protection
      const executePromise = new Promise((resolve, reject) => {
        try {
          // Execute the code
          const result = this.pyodide.runPython(code);
          
          // Get captured output
          const output = this.lastOutput || '';
          const error = this.lastError || '';

          resolve({
            success: true,
            output: output.slice(0, maxOutputLength),
            error: error.slice(0, maxOutputLength),
            result: result
          });
        } catch (err) {
          resolve({
            success: false,
            output: this.lastOutput || '',
            error: this.formatKidFriendlyError(err),
            result: null
          });
        }
      });

      const timeoutPromise = new Promise((_, reject) => {
        setTimeout(() => reject(new Error('Code execution timed out')), timeout);
      });

      return await Promise.race([executePromise, timeoutPromise]);

    } catch (error) {
      return {
        success: false,
        output: '',
        error: this.formatKidFriendlyError(error),
        result: null
      };
    }
  }

  formatKidFriendlyError(error) {
    const errorStr = error.toString();

    // Common Python errors with kid-friendly explanations
    const errorMappings = {
      'SyntaxError': {
        keyword: 'SyntaxError',
        message: '🤔 Oops! There\'s a spelling or typing mistake in your code. Check your brackets, quotes, and colons!'
      },
      'NameError': {
        keyword: 'NameError',
        message: '🔍 Python doesn\'t recognize that word! Make sure you spelled it correctly or defined it first.'
      },
      'IndentationError': {
        keyword: 'IndentationError',
        message: '📐 Your code spacing is off! Make sure your indents (spaces) line up properly.'
      },
      'TypeError': {
        keyword: 'TypeError',
        message: '🔢 You\'re trying to mix different types of data! Check if you\'re adding numbers to words.'
      },
      'ZeroDivisionError': {
        keyword: 'ZeroDivisionError',
        message: '➗ You can\'t divide by zero! Try dividing by a different number.'
      },
      'IndexError': {
        keyword: 'IndexError',
        message: '📋 You\'re trying to access something that doesn\'t exist in your list! Check your list size.'
      },
      'timeout': {
        keyword: 'timeout',
        message: '⏰ Your code is taking too long! Try making it simpler or check for infinite loops.'
      }
    };

    // Find matching error type
    for (const [key, mapping] of Object.entries(errorMappings)) {
      if (errorStr.includes(key)) {
        return `${mapping.message}\n\nTechnical details: ${errorStr}`;
      }
    }

    // Default kid-friendly message
    return `🚨 Something went wrong! Don't worry, this happens to all programmers!\n\nTechnical details: ${errorStr}`;
  }

  // Utility method to check if code contains potentially unsafe operations
  isCodeSafe(code) {
    const dangerousPatterns = [
      /import\s+os/,
      /import\s+sys/,
      /import\s+subprocess/,
      /__import__/,
      /exec\s*\(/,
      /eval\s*\(/,
      /open\s*\(/,
      /file\s*\(/,
      /input\s*\(/,
      /raw_input\s*\(/
    ];

    return !dangerousPatterns.some(pattern => pattern.test(code));
  }

  // Get available Python packages for educational use
  getAvailablePackages() {
    return [
      'math', 'random', 'datetime', 'json',
      'numpy', 'matplotlib', 'pandas'
    ];
  }
}

// Create singleton instance
const pythonExecutor = new PythonExecutor();

export default pythonExecutor;