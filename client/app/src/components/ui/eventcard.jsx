import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MapPin, Calendar, Link as LinkIcon } from 'lucide-react';

const EventCard = ({
  name,
  location,
  description,
  date,
  link,
  type // Type of event (e.g., day party, festival, etc.)
}) => {
  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-2xl font-bold">{name}</CardTitle>
            <CardDescription className="flex items-center mt-1">
              <MapPin className="w-4 h-4 mr-1" />
              {location}
            </CardDescription>
          </div>
          <Badge variant="secondary">{type}</Badge>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-gray-600 mb-4">{description}</p>
        <div className="flex items-center mb-4">
          <Calendar className="w-5 h-5 text-gray-500 mr-1" />
          <span className="font-semibold">
            {new Date(date).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}
          </span>
        </div>
      </CardContent>
      <CardFooter>
        <Button variant="default" className="w-full" asChild>
          <a href={link} target="_blank" rel="noopener noreferrer">
            <LinkIcon className="w-4 h-4 mr-2" />
            Visit Event Page
          </a>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default EventCard;
