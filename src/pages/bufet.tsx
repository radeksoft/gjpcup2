import Card from 'react-bootstrap/Card';
import { PAGE_STYLE } from '../logic';

export const BufetPage: React.FC = () => {
    return (
        <div style={PAGE_STYLE}>
            <Card className="m-4">
                <Card.Header>Bufet</Card.Header>

                <Card.Body style={{fontSize: 18}}>
                <p className="pb-4">Bufet je otevřený!</p>

                <p>Párek v rohlíku – 25 Kč</p>
                <p>Pomelo grep 0.3 – 27 Kč</p>
                <p>Pomelo grep 0.5 – 35 Kč</p>
                <p>Oreo zmrzlina – 20 Kč/kopeček</p>
                <p>Voda citron led 0.5 – 10 Kč</p>
                <p>Toust – 25 Kč</p>

                <p className="mt-4">Dejte si do nosu :)</p>

                <p className="mt-4"><b>Prosíme, nenoste jídlo do haly!</b></p>

                </Card.Body>
            </Card>
        </div>
    );
};
