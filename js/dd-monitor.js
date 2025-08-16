$(document).ready(function() {
    const defaultCid = '31405244';
    const baseSrc = 'https://www.bilibili.com/blackboard/live/live-activity-player.html?cid=';
    const srcSuffix = '&quality=0';

    function updateGrid(layout) {
        const [rows, cols] = layout.split('x').map(Number);
        const totalCells = rows * cols;

        $('#grid-container').empty();
        $('#grid-container').css({
            'grid-template-columns': `repeat(${cols}, minmax(0, 1fr))`,
            'grid-template-rows': `repeat(${rows}, auto)`
        });

        for (let i = 0; i < totalCells; i++) {
            const cell = $('<div>').addClass('grid-cell');
            const inputGroup = $('<div>').addClass('input-group');
            const input = $('<input>').attr('type', 'text').attr('placeholder', '输入房间号');
            const button = $('<button>').text('前往');
            const iframe = $('<iframe>').attr({
                frameborder: 'no',
                framespacing: '0',
                scrolling: 'no',
                allow: 'autoplay; encrypted-media',
                allowfullscreen: 'true'
            });

            button.on('click', function() {
                const cid = input.val().trim();
                if (cid) {
                    iframe.attr('src', baseSrc + cid + srcSuffix);
                    adjustIframeSize(iframe, layout);
                }
            });

            inputGroup.append(input).append(button);
            cell.append(inputGroup).append(iframe);
            $('#grid-container').append(cell);

            // Initial setup for the first cell
            if (i === 0) {
                input.val(defaultCid);
                iframe.attr('src', baseSrc + defaultCid + srcSuffix);
                adjustIframeSize(iframe, layout);
            }
        }

        adjustAllIframes(layout);
    }

    function adjustIframeSize(iframe, layout) {
        const cell = iframe.parent();
        const cellWidth = cell.width();
        const aspectRatio = 360 / 640;
        let height = cellWidth * aspectRatio;
        iframe.css({
            'width': cellWidth + 'px',
            'height': height + 'px'
        });
    }

    function adjustAllIframes(layout) {
        const [rows, cols] = layout.split('x').map(Number);
        const isSquareLayout = rows === cols; // Check for 1x1, 2x2, 3x3
        const windowHeight = $(window).height();
        const windowWidth = $(window).width();
        const headerHeight = $('#layout-control').outerHeight() + 40; // Account for padding and layout control
        const gap = 20; // CSS gap between grid cells
        const sidePadding = 40; // 20px blank on each side

        let maxCellWidth = (windowWidth - (cols - 1) * gap - 2 * sidePadding) / cols;
        let maxCellHeight = (windowHeight - headerHeight - (rows - 1) * gap - 2 * sidePadding) / rows;
        const aspectRatio = 360 / 640;

        if (isSquareLayout) {
            // For square layouts, scale down further to fit within screen height
            const maxIframeHeight = maxCellHeight * 0.8; // Reduced to 80% for better fit
            maxCellWidth = Math.min(maxCellWidth, maxIframeHeight / aspectRatio);
            maxCellHeight = maxCellWidth * aspectRatio;
        }

        $('.grid-cell').css({
            'width': maxCellWidth + 'px',
            'height': 'auto'
        });

        $('iframe').each(function() {
            $(this).css({
                'width': maxCellWidth + 'px',
                'height': (maxCellWidth * aspectRatio) + 'px'
            });
        });

        // Ensure grid container width for even spacing
        const gridWidth = maxCellWidth * cols + gap * (cols - 1);
        $('#grid-container').css('width', '100%');
    }

    $('#layout-select').on('change', function() {
        const layout = $(this).val();
        updateGrid(layout);
    });

    $(window).on('resize', function() {
        adjustAllIframes($('#layout-select').val());
    });

    // Initial load
    updateGrid('1x1');
});