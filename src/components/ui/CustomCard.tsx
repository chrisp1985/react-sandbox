import { Card, CardContent } from "@mui/material";

export const CustomCard = ({ children }: { children: React.ReactNode }) => {
    const cardSx = {
        maxWidth: '90%', 
        mx: 'auto', 
        backgroundColor: '#f9f9f9', 
        boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
    };  
    return (
        <Card sx={cardSx}>
            <CardContent>
                {children}
        </CardContent>
      </Card>
    );
}   