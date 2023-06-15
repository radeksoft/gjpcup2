import React, { useMemo } from 'react';
import Alert from 'react-bootstrap/Alert';
import Card from 'react-bootstrap/Card';
import { useGameLogic } from '../logic';

export const News: React.FC = () => {
    const { news } = useGameLogic();

    const currentNews = useMemo(() => {
        const cloned = [...news];
        cloned.sort((a, b) => new Date(b.created as string).getTime() - new Date(a.created as string).getTime());
        // cloned.reverse();

        return cloned;
    }, [news]);

    if (!currentNews || !currentNews.length)
        return (<></>);

    return (
        <Card className='mb-4'>
            <Card.Header className='text-center'>Aktuality</Card.Header>
            <Card.Body className='py-0'>
                {currentNews.map(info => (
                    <Alert variant='secondary' className='my-2'>{info.text}</Alert>
                ))}
            </Card.Body>
        </Card>
    );
};
