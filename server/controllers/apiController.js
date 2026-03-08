/**
 * @desc Ping test
 * @route GET /api/ping
 */
exports.ping = (req, res) => {
    res.status(200).json({
        success: true,
        message: 'Server is reachable!'
    });
};

/**
 * @desc Get sample data
 * @route GET /api/data
 */
exports.getData = (req, res) => {
    try {
        const sampleData = {
            appName: 'MetaCode Backend API',
            version: '1.0.0',
            description: 'Scalable express server integrated with .env'
        };

        res.status(200).json({
            success: true,
            data: sampleData
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
};
