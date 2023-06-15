import Card from 'react-bootstrap/Card';
import { PAGE_STYLE } from '../logic';

export const BufetPage: React.FC = () => {
    return (
        <div style={PAGE_STYLE}>
            <Card className="m-4">
                <Card.Header>Bufet</Card.Header>

                <Card.Body>
                <p className="pb-4">Bufet je otevřený! V nabídce najdete:</p>

                <p>Whey protein - 3O Kč</p>
                <p>Párek v rohlíku - 20 Kč</p>
                <p>Párek na tácku - 10 Kč</p>
                <p>Toust - 20 Kč</p>
                <p>Voda citrón máta - 5 Kč</p>
                <p>Kreatin 10g - 30 Kč</p>
                <p>Kofein 200mg - 40 Kč</p>
                <p>Sušené mléko - 15 Kč</p>
                <p>Muffin od Bobisovy babičky - 10 Kč</p>

                <p className="pt-2">Dejte si do nosu ;)</p>
                </Card.Body>
            </Card>
        </div>
    );
};
