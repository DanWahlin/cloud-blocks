import React from 'react';
import { styled } from '@mui/material/styles';
import Tooltip, { TooltipProps, tooltipClasses } from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';

import { IService, IServiceCategory } from 'shared/interfaces';
import CloudBlock from './CloudBlock';

export default function CloudService(props: { serviceCategory: IServiceCategory, service: IService  }) {
    const {serviceCategory, service} = props;

    function onDragStart(event: React.DragEvent, service: IService) {
        const dragData = { 
            ...service, 
            category: serviceCategory.name,
            cssClass: serviceCategory.cssClass 
        };
        if (event.dataTransfer) {
            event.dataTransfer.setData('application/reactflow', JSON.stringify(dragData));
            event.dataTransfer.effectAllowed = 'move';
        }
    }

    const HtmlTooltip = styled(({ className, ...props }: TooltipProps) => (
        <Tooltip {...props} arrow classes={{ popper: className }} />
    ))(() => ({
        [`& .${tooltipClasses.arrow}`]: {
            color: '#4b4b4b',
        },
        [`& .${tooltipClasses.tooltip}`]: {
            backgroundColor: '#4b4b4b',
            fontSize: '12px',
        },
    }));

    return (
        <HtmlTooltip
            title={
                <>
                    <Typography color="inherit">{service.name}</Typography>
                    <div className="tooltip-description">{service.description}</div>
                    {service.relatedServices && (
                        <div className="tooltip-related-services">Related services: {service.relatedServices.join(', ')}</div>
                    )}
                </>
            }
        >
            <div key={service.name} 
                className={`${serviceCategory.cssClass} service-picker-item service-picker-item-size cursor-drag-drop`}
                onDragStart={(event) => onDragStart(event, service)} draggable
            >
                <CloudBlock name={service.name} 
                    description={service.description} 
                    image={service.image} 
                    cssClass={serviceCategory.cssClass}
                />
            </div>
        </HtmlTooltip>
    );
}